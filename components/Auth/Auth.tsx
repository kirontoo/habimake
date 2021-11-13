import { 
    useEffect, 
    useState, 
    createContext, 
    useContext, 
    ReactNode
} from "react";
import { SupabaseClient, Session, User } from "@supabase/supabase-js"
import { supabase } from "lib/supabaseClient";
import { error } from "console";

interface AuthSession {
    user: User | null,
    session: Session | null,
    signIn: (_: UserCredentials) => void,
    signUp: (_: UserCredentials) => void,
    signOut: () => void,
}

const currSession: AuthSession  = {
    user: null,
    session: null,
    signIn: (_: UserCredentials) => null,
    signUp: (_: UserCredentials) => null,
    signOut: () => null,
}

interface UserCredentials {
    email: string,
    password: string
}


function useProvider(): AuthSession {
    let [user, setUser] = useState<User | null>(null);
    let [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const session = supabase.auth.session()
        setSession(session)
        setUser(session.user ?? null)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_, session) => {
                setSession(session)
                setUser(session.user ?? null)
            }
        )

        return () => {
            authListener?.unsubscribe()
        }
    }, [])

    async function signIn(u: UserCredentials) {
        const response = await supabase.auth.signIn({
            email: u.email,
            password: u.password,
        });
        setUser(response.user);
        setSession(response.session);

        if ( response.error ) {
            throw error(response.error)
        }
    }

    async function signOut() {
        return await supabase.auth.signOut();
    }

    async function signUp(u: UserCredentials) {
        const response = await supabase.auth.signUp(u);
        setUser(response.user);
        setSession(response.session);

        if ( response.error ) {
            throw error(response.error)
        }
    }

    return { user, session, signIn, signOut, signUp };
}

// Creates a lifecycle based on initailValues
export const AuthContext = createContext(currSession);

// create hook for user session
export const useAuth = () => useContext( AuthContext );

export function AuthProvider ({ children } : { children: ReactNode }) {
    const value: AuthSession = useProvider();

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

