import path from "path";

export function getFilePath(folder: string, slug: string = '', page: string = 'page.mdx') {
    return slug !== '' ? 
        path.join(process.cwd(), "content", folder, slug, page) : 
        path.join(process.cwd(), "content", folder);
}