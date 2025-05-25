export function generateTags(product) {
    const tags = new Set();

    if (product.name) {
        product.name
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 3)
            .forEach(word => tags.add(word));
    }

    if (product.description) {
        product.description
            .toLowerCase()
            .split(/\s+/)
            .filter(word => word.length > 4)
            .forEach(word => tags.add(word));
    }

    if (product.color) tags.add(product.color.toLowerCase());
    if (product.gender) tags.add(product.gender.toLowerCase());

    return [...tags];
}
