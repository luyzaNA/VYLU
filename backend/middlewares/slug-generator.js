import slugify from 'slugify';

export function generateSlug(name) {
    if (!name) return null;
    return slugify(name, { lower: true, strict: true });
}
