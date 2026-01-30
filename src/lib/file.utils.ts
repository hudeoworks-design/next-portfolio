import path from "path";

export function getFilePath(folder: string, slug: string = '') {
    return slug !== '' ? 
        path.join(process.cwd(), "content", folder, slug, "page.mdx") : 
        path.join(process.cwd(), "content", folder);
}