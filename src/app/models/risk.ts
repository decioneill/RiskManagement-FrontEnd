/* Basic model class for a Risk */
export class Risk {

    // Unique identifier
    id: number;

    // Full Description
    description: string;

    // short Description
    shortDescription: string;

    // inherent Risk Score
    inherentRiskScore: number;

    // residual risk score
    residualRiskScore: number;

    // inherent likelihood
    inherentLikelihood: number;

    // inherent impact
    inherentImpact: number;

    // mitigation measures
    mitigationmeasures: number;
}