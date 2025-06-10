export function formataIdentificacaoConsulta(id: string) { 
    return "CONS-" + id.substring(0, 8).toUpperCase(); 
}

export function formataIdentificacaoDoc(id: string) {
    return "DOCS-" + id.substring(0, 8).toUpperCase(); 
}