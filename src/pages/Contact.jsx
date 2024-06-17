export default function Contact() {
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6 border rounded p-4 mx-auto">
                    <h3>Contact Us</h3>
                    <p>Fill out the form below to get in touch with us.</p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" rows="3"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}