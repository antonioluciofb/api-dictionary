const verifyMandatoryFields = (mandatoryFields: any, bodyFields: any) => {
    const hasAllMandatoryFields = mandatoryFields.reduce(
        (acc: any, field: any) => {
            const hasField = Object.keys(bodyFields).includes(field)

            if (hasField) return acc

            return acc?.length > 0 ? `${acc},${field}` : field
        },
        ''
    )

    const hasMissingMandatoryFields = hasAllMandatoryFields.length > 0

    if (hasMissingMandatoryFields) {
        return hasAllMandatoryFields
    }
}

export default verifyMandatoryFields
