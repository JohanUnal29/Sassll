class Producto {

    constructor(id,nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;

    }

}

class ProductoCarrito {

    constructor(id,nombre,cantidad,precio,total){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
        this.total = total;

    }

}

const producto1 = new Producto(001,"Aretes",18000);
const producto2 = new Producto(002,"Cadena",20000);
const producto3 = new Producto(003,"Earcops",12000);

const BBDD =[producto1,producto2,producto3];
let carrito = [];
let suma = 0;
const descuento = (a,b) => a * b
const resta = (a,b) => a - b    

function comprarDinamico(producto){
    let cantidadProductos = Number(prompt("¿Cuantas unidades quieres de este producto?"))
    const productoCa = new ProductoCarrito(BBDD[producto].id,BBDD[producto].nombre,cantidadProductos,BBDD[producto].precio,BBDD[producto].precio*cantidadProductos);
    carrito.push(productoCa);
}

function ConsultarTotal(){
    
    carrito.forEach((el)=>{
        suma += el.total;
        console.log("ID:",el.id,"Nombre:",el.nombre,"Cantidad:",el.cantidad,"Precio unitario:",el.precio,"Total:",el.total);
    })
    if (suma >= 200000){
        let Descuento = resta(suma,descuento(suma,0.05));
        console.log("Valor total con descuento: "+ Descuento);
    } else{
        console.log("Valor total: "+ suma);
    }
    suma = 0;
    
}

function eliminar(POS){
    
    carrito.splice(POS, 1)
    alert("Producto eliminado")
   
}

console.log(BBDD)

let entrada = prompt("Bienvenido al carrito de compras \n 1-Consultar características del producto \n 2-Ingresar al carrito \n 3-Eliminar producto \n 4-Consultar total \n 5-salir");

while(entrada != "5" ){
   switch (entrada) {
       case "1":
            let disponible = prompt("Ingresa el nombre exacto del producto que buscas");
            const resultado = BBDD.find((el) => el.nombre === disponible);
            console.log(resultado);
            break;
       case "2":
            let agregarProducto = Number(prompt("elige los productos que quieres agregar: \n 0- Aretes: 18000 COP \n 1- Cadena: 20000 COP \n 2- Earcops: 12000 COP"));
            comprarDinamico(agregarProducto);
            break;
        case "3":
            let POSuser = Number(prompt("Ingrese la posición del producto que quiere eliminar teniendo en cuenta que el primer producto esta en posición 0"));
            eliminar(POSuser);
            break;
        case "4":
            ConsultarTotal();
            break;
        default:
            alert("Opción invalida")
            break;
   }
   entrada = prompt("\n 1-Consultar características producto \n 2-Seguir comprando \n 3-Eliminar producto \n 4-Consultar total \n 5-salir");
}
