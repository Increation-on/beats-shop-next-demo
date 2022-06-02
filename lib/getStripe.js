import {
    loadStripe
} from "@stripe/stripe-js";

let stripePromise;

const key = "pk_test_51L6CodCju0FP20aDw8AzKwO4ahhWuhPDeIZcWiZaC28uy4xmcn3DKJx1n17tpFgJOs0yEekthslW1hXNNhDb8EaB00EhfLmQqc"


const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe(key);
    }
    return stripePromise;
}

export default getStripe;