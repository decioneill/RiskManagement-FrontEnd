export class Mitigation {

    id: number
    name: string
    description: string
    currentStatus: number
    reviewDate: Date
}

export enum MitigationStatusType {
    "Under Consideration" = 0,
    "Accepted" = 1,
    "Ongoing" = 2,
    "To Be Reviewed" = 3,
    "Closed" = 4
}