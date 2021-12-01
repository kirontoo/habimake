export default function parseToken(token: string): string {
    if (token === null || token === undefined) {
        return '';
    }

    return token.split(" ")[1];
}
