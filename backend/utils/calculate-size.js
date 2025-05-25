export function combineSizeWithOverride(size, customOverride) {
    if (!size) return null;

    const combined = {
        type: size.type,
        label: size.label,
        values: {}
    };

    if (size.values instanceof Map) {
        for (const [key, value] of size.values.entries()) {
            combined.values[key] = value;
        }
    } else if (size.values && typeof size.values === 'object') {
        Object.assign(combined.values, size.values);
    }

    if (customOverride && (customOverride.size > 0 || Object.keys(customOverride).length > 0)) {
        if (customOverride instanceof Map) {
            for (const [key, value] of customOverride.entries()) {
                combined.values[key] = value;
            }
        } else if (customOverride && typeof customOverride === 'object') {
            Object.assign(combined.values, customOverride);
        }
    }

    return combined;
}