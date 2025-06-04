import axios from "axios";
import Response from "../models/response";

const baseURL = "http://localhost:8080/";

export type UserType = "PACIENTE" | "PSICOLOGO";
export interface AuthResponse {
    idUsuario: string;
    email: string;
    token: string;
    crp?: string | null;
}

export async function login(logg: string, senha: string, userType: UserType): Promise<Response<AuthResponse>> {
    try {
       
        const endpoint = userType === "PACIENTE" ? "login/paciente" : "login/psicologo";
        
  

        const payload = userType === "PACIENTE" ? { email:logg, senha } : { crp: logg, senha };
        const response = await axios.post(baseURL + endpoint, payload);
        
        console.log(`Resposta do servidor:`, response.data);
        
        if (response.status === 200 && response.data.dado) {
            const data = response.data.dado;
 
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.idUsuario);
            localStorage.setItem("userType", userType);

           if (userType === "PSICOLOGO") {
                localStorage.setItem("userCRP", data.crp);
           }else if (userType === "PACIENTE"){
                localStorage.setItem("userEmail", data.email);
           }

            return {
                dado: data,
                erro: "",
            };
        }

        return {
            dado: null,
            erro: "Falha na autenticação"
        };
    } catch (error) {
        console.error(`Erro ao realizar login de ${userType}:`, error);
        return {
            dado: null,
            erro: `Erro ao conectar com o servidor: ${error}`
        };
    }
}

export function logout(): void {
  
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
}

export function isAuthenticated(): boolean {
    return localStorage.getItem("token") !== null;
    //talvez adicoar uma lógica para validar o token
}

export function getUserType(): UserType | null {
    return localStorage.getItem("userType") as UserType ;
}

export function getUserId(): string | null{
    return localStorage.getItem("userId");
}

export function getUserEmail(): string | null{
    return localStorage.getItem("userEmail");
}
export function getUserCRP(): string | null{
    return localStorage.getItem("userCRP");
}
