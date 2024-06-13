import axios from 'axios';

export default function CreateCardPage() {

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;

        console.log(form)

        //You can pass formData as a fetch body directly:
        axios.post('http://localhost:8080/cards', {
            question: form.question.value,
            answer: form.answer.value,
            tag: form.tag.value
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="flex items-center justify-center h-3/4 relative">
            <form method="post" onSubmit={handleSubmit} id='my-form'>
                <label className="form-control w-full max-w-xs flex flex-col">
                    <div className="label">
                        <span className="label-text">What is your question?</span>
                    </div>
                    <input type="text" name="question" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label mt-5">
                        <span className="label-text">Type your answer</span>
                    </div>
                    <input type="text" name='answer' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="label mt-5">
                        <span className="label-text">Set a tag</span>
                    </div>
                    <input type="text" name='tag' placeholder="Optional" className="input input-bordered w-full max-w-xs" />
                    <div className="mt-5 flex-grow"><button className="btn btn-primary w-36">Créer</button></div>
                </label>
            </form>
        </div>
    );
}
