export interface UserSummary {
    // Kohustuslikud väljad uue kasutaja loomisel:
    id: string, // Kui andmebaas/Sequelize genereerib UUID ise
    UserName: string,
    EmailAddress: string,
}

export interface User extends UserSummary {
    // Valikulised väljad uue kasutaja loomisel (kuna neil on vaikeväärtus või nad on nullitavad):
    SignupDate: string, 
    AccountType: string,
    AvatarName: string,
    UserCollectionID: string | null,
    ReviewListID: string | null,
    ProfileID: string | null,
    CredentialID: string | null,
    Password: string,
    PasswordConfirmation: string | null,
}