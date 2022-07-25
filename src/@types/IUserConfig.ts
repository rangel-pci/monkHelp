export interface IUserConfig {
    id?: string,
    userId: string,
    linkedToOrganization: string,
    ownOrganization: string,
    ownOrganizationId: string,
    accessAllowed?: boolean,
}