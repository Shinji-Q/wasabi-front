import "../../style/ErrorPage.css"

export function ErrorPage() {
    return (
        <div className="errorPage">
            <h1>Sorry for your loss</h1>
            <a href={`/`} id="returnHome">Voltar à página inicial</a>
        </div>
    );
}

