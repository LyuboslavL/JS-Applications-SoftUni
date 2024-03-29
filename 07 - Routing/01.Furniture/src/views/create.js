import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFurniture } from '../api/data.js';

const itemTemplate = (onSubmit, isValid) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${isValid}" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${isValid}" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${isValid}" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${isValid}" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${isValid}" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${isValid}" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
</div>`

export async function createPage(context) {
    context.render(itemTemplate(onSubmit))

    let isValid = {
        valid: ' is-valid',
        invalid: ' is-invalid',
    };

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const make = formData.get('make');
        const model = formData.get('model');
        const year = formData.get('year');
        const description = formData.get('description');
        const price = formData.get('price');
        const img = formData.get('img');
        const material = formData.get('material');

        if (make == '' || model == '' || year == '' || description == '' || price == '' || img == '') {
            return alert('Please fill all mandatory fields!');
        } else if (make.length < 4 || model.length < 4) {
            return alert('Make and Model fields must be at least 4 characters long!');
        } else if (year < 1950 || year > 2050) {
            return alert('Incorrect year');
        } else if (description.length <= 10) {
            return alert('Description must be at least 10 characters long');
        } else if (price < 0) {
            return alert('Price can\'t be a negative number');
        }

        const data = {
            make,
            model,
            year,
            description,
            price,
            img,
            material
        };

        await createFurniture(data);
        context.page.redirect('/');
    }

};

