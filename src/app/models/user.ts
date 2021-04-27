/* Basic model class for a User */
export class User {

    // Unique identifier
    id: number;

    // Username
    username: string;

    // Email Address
    email: string;

    // Bool for whether user is Risk manager
    // Determines visibility of controls only, any operations will verify role with Authenticator. 
    riskManager: Boolean;

    // Boolean for whether user is Administrator or not.
    // Determines visibility of controls only, any operations will verify role with Authenticator. 
    admin: Boolean;

    // String representation of users Authentication Token 
    token: string;
}

// Constant to allow change of 1 value here, rather than change value in every component.
export const role = {
    Admin: "admin",
    RiskManager: "riskManager"
}
