export async function getEmbedding(text) {

    return new Array(768).fill(0).map((_, i) => Math.sin(i + text.length));
}