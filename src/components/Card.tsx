type argsCard = {
    text: String;
}

export function Card(args: argsCard){

    return <h3>{args.text}</h3>

}
