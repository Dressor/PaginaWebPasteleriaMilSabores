import { useState } from "react";

/* Ejemplo de Prop y State donde Prop = Parametro y State = Estado Local */

/*export default function PropyState() {
    const [count, setCount] = useState(10);

    return (
        <div> 
            <p>Has hecho clic {count} mas los clic que hiciste</p>
            <button onClick={() => setCount(count + 1)}>Haz clic aquí para sumar</button>
        </div>
    );*/
export default function PropyState({valorInicial}) {
    const [count, setCount] = useState(valorInicial);

    return (
        <div> 
            <p>Has hecho clic {count} mas los clic que hiciste</p>
            <button onClick={() => setCount(count + 1 + valorInicial)}>Haz clic aquí para sumar</button>
        </div>
    );
}