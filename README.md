Project Ecommerce CoderHouse

Este proyecto de ecommerce es elaborado en React Js. conectado a Firebase:

Es navegable con un NAvbar y muestra todos los productos disponibles con imagen y nombre.

También se puede navegar por cada categorias : Audifonos, parlantes, holders y cargadores.

Al navegar por cada producto muestra el detalle: descripción, precio y stock.

Al seleccionar los productos en comprar se cargará la cantidades de productos en card.

Cuando navegamos en cart veremos el detalle de todos los productos seleccionados con el detalle de costo total y cuenta con el botón "checkout" para continuar con la compra. En caso cart no tenga productos, mostrará un mensaje de que no se tiene productos seleccionados.

Al clickear checkout nos pedirá completar datos : Nombre y Apellido, Email, confirmacion de Email y Número de contacto; y si los datos son correctos según la validación, se activará el botón "finalizar compra".

Al clickear botón "finalizar compra" nos dará un mensaje con el cógido de orden de compra.

El stock es manejado por firestore y se actualiza por cada orden de compra realizado.

Las colecciones creadas en firestore son de items, categories y órdenes.



![image](https://user-images.githubusercontent.com/78805793/129563838-475a773f-bb36-4b4c-b50d-1b60f979d7f8.png)
