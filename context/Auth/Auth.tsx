import { 
    useEffect, 
    useState, 
    createContext, 
    useContext, 
    ReactNode
} from "react";
import { Session, User } from "@supabase/supabase-js"
import { supabase } from "lib/supabaseClient";

interface AuthSession {
    user: User | null,
    session: Session | null,
    isAuth: boolean,
    signIn: (_: UserCredentials) => Promise<void>,
    signUp: (_: UserCredentials & { username: string }) => Promise<void>,
    signOut: () => Promise<void>,
}

const currSession: AuthSession  = {
    user: null,
    session: null,
    isAuth: false,
    signIn: (_: UserCredentials) => null,
    signUp: (_: UserCredentials) => null,
    signOut: () => null,
};

interface UserCredentials {
    email: string;
    password: string;
}; 

function useProvider(): AuthSession {
    let [user, setUser] = useState<User | null>(null);
    let [session, setSession] = useState<Session | null>(null);
    let [isAuth, setIsAuth ] = useState<boolean>(false);

    useEffect(() => {
        // NOTE: s is the session data value
        const s = supabase.auth.session()
        setState(s);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_, s) => {
                setState(s);
            }
        )

        return () => {
            authListener?.unsubscribe()
        }
    }, []);

    function setState(s: Session) {
        setSession(s);
        setUser(s?.user ?? null);
        setIsAuth(s !== null && s?.user !== null);
    }

    function signIn(u: UserCredentials): Promise<void> {
        return new Promise( async function(resolve, reject) {
            const response = await supabase.auth.signIn({
                email: u.email,
                password: u.password
            });

            if ( response.error ) {
                return reject(response.error);
            }

            // successful login
            setState(response.session);
            return resolve();
        });
    }

    async function signOut(): Promise<void> {
        return new Promise( async function(resolve, reject) {
            let { error } = await supabase.auth.signOut();
            if ( error ) { 
                return reject(error);
            }

            setState(null)
            return resolve();
        })
    }

    async function signUp(u: UserCredentials & { username: string }): Promise<void> {
        return new Promise( async function(resolve, reject) {
            let  { email, password, username } = u;
            // signup with a session
             const response = await supabase.auth.signUp({
                 email,
                 password
             });

             if ( response.error ) {
                 return reject(response.error);
             }

             // successful signup
             setState(response.session);

            let profile = JSON.stringify({
                username: username,
                id: response.session.user.id,
            });

            await fetch('/api/user', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: profile
            });

            return resolve();
        });
    }

    return { user, session, isAuth, signIn, signOut, signUp };
}

// Creates a lifecycle based on initailValues
export const AuthContext = createContext(currSession);

// create hook for user session
export const useAuth = () => {
    let context = useContext( AuthContext );
    if ( context === undefined ) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}


export function AuthProvider ({ children } : { children: ReactNode }) {
    const value: AuthSession = useProvider();

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

