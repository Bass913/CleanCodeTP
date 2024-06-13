export default function Card({ category, question, tag }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    <div className="badge badge-secondary">{category}</div>
                </h2>
                <div className="text-center">
                    <p>{question}</p>
                </div>

                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{tag}</div>
                </div>
                <button className="btn btn-primary w-36">Répondre</button>

            </div>
        </div>
    )
}