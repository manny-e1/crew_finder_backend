export const html = (resetUrl, verification=false) => {
    if (!verification) {
        return `
                <h1>You have requested a password reset</h1>
                <p>Please make a put request to the following 
                    <a href="${resetUrl}">${resetUrl}</a>
                </p>
                
            `;
    }
}