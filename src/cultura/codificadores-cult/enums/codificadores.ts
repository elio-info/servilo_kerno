/* 
Aqui se referencian los 'Tipos de Actividad Cultural' en los que se le definiran las actividades culturales. Esto se referencia para usarlos como guia en las planificaciones que se realizan en cultura.
Valor = Descripcion.

The `Nomenclador_EstadosDeActividadCultural` enum in the TypeScript code is defining different
states or statuses for cultural activities. Each enum member represents a state with a key-value
pair where the key is a single character abbreviation for the state, and the value is a descriptive
string representing that state. */
export enum Nomenclador_TiposDeActividadCultural{
    'TCA'= 'Taller Creación Artística',
    'TA'= 'Taller Apreciación Artística', 
    'AIC' = 'Actividad Institución Cultural'
}

/* 
Aqui se referencian los tipos de 'Estados' en los que se le definiran las actividades culturales. Esto se referencia para usarlos como guia en las planificaciones que se realizan en cultura.
Valor = Descripcion.

The `Nomenclador_EstadosDeActividadCultural` enum in the TypeScript code is defining different
states or statuses for cultural activities. Each enum member represents a state with a key-value
pair where the key is a single character abbreviation for the state, and the value is a descriptive
string representing that state. */
export enum Nomenclador_EstadosDeActividadCultural{
    'P' = 'planificada', 
    'R' = 'realizada', 
    'S' = 'suspensa', 
    'D' = 'Denegada'
}

/* 
Aqui se referencian los tipos de 'Talento' a los que se le realizan los contratos. Esto se referencia para usarlos como guia en los contratos que se realizan en cultura.
Valor = Descripcion.

This TypeScript code is defining an enum named `Nomenclador_Clasifrica_ContratoTalento` which
represents different classifications for talent contracts. Each enum member consists of a key-value
pair where the key is a single character representing the classification and the value is a
descriptive string for that classification. */
export enum Nomenclador_Clasifica_ContratoTalento{
    "M" = "Mipyme" ,  
    "T" = "TCP" ,   
    "P" = "Profesional" ,   
    "A" = "Aficionado"
}

/**
 * 	Grupos Etáreos: registrar la forma en que se clasifica la población de acuerdo a su edad.
 *  En la información actual se clasifica en: 
 */
export enum Nomenclador_GrupoEtareo{
    'N'='Niño (N)',
    'AD'='Adolescente (AD)',
    'J' ='Joven (J)',
    'A'= 'Adulto (A)',
    'AM' = 'Adulto Mayor (AM)',
    'PG' = 'Público General (PG)'
}

export enum Nomenclador_Clasifrica_ProgramasSociales{
    "Prov" = "Programa Social Provincial" ,  
    "Prior" = "Programa Social Priorizado " ,   
    "Espc" = "Programa Social Provinciales " 
}