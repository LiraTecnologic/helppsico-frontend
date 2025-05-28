export function formataIdentificacao(id: string) { 
    return "CONS-" + id.substring(0, 8).toUpperCase(); 
}