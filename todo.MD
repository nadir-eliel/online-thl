# TODO list of the project

- Al hacer clic en el boton de editar, permitir escribir la patente, es decir, permitir editar el item.
- Marcar los numeros con un icon o color distinto para que se diferencien de la patente (en css, crear la clase BayNumber)


- En el modal que se abre, deberian aparecer en gris los labels RUC & REGO, faltan las etiquetas de Plate y de Date

- Lograr que al apretar el boton save, se guarden los datos.
- Quitar las constantes de API, agregar variables de entorno

- Crear una función para generar el texto del mail hacia Scheduling:

Estimados: Necesitamos nuevos REGO y RUC para las siguientes:
ASD9   REGO RUC
QEC90  RUC
MAS189 REGO
...

- Crear una función para resetear todo el tablero. Deberia ser como en Github que pide que escriba un texto especifico para borrar todo: "clean board" (ignoreCase) y actualizar la base de datos para que todo esté vacío. Nota: ¿Debería guardar un historico de que vehiculo estuvo en qué bay?