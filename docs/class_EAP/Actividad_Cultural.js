/// <summary>
/// actividad cultural informacion base
/// </summary>
function Actividad_Cultural(manager, instanceName) {

	/// <summary>
	/// si:
	/// <ol>
	/// 	<li>vacio - no tiene</li>
	/// 	<li>llave ICult prov</li>
	/// </ol>
	/// </summary>
	this.actProv;
	this.descripcion;
	/// <summary>
	/// cantidad que asistio
	/// </summary>
	this.edad_asistencia;
	/// <summary>
	/// Sale del catalogo de GruposEtarios
	/// </summary>
	this.edad_destinada;
	/// <summary>
	/// se pone la entidad que manda la actividad
	/// </summary>
	this.entidad_dirige;
	this.extraPlan;
	this.fecha_actcult;
	this.hora_actcult;
	this.id_act;
	/// <summary>
	/// lugar donde se dara la actividad:
	/// <ul>
	/// 	<li>Entidad Cultural (Institucion_Cult_Class)</li>
	/// 	<li>Consejo Popular (Consejo_Popular_Class)</li>
	/// 	<li>Comunidad en Transformacion (ComunidadTransformacion_Class)</li>
	/// </ul>
	/// puede ser en cualquiera de estos lugares. pensar en la estructura:
	/// <ol>
	/// 	<li>tipo_lugar [IECult , CPop, ComTrnsf,Domc]</li>
	/// 	<li>Id_seleccion anterior</li>
	/// 	<li>nombreLugar</li>
	/// </ol>
	/// </summary>
	this.lugar;
	/// <summary>
	/// todas las manifestaciones que represnta.
	/// la primera es la principal
	/// </summary>
	this.manifestacion_art;
	this.nombre_actcult;
	/// <summary>
	/// todos los talentos involucrados
	/// </summary>
	this.talentos_art;

}//end Actividad_Cultural

