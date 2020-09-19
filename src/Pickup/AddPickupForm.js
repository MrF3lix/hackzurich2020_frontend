import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import InputFile from '../Form/InputFile';
import { InputSelect } from '../Form/InputSelect';
import { InputText } from '../Form/InputText';
import { InputTextArea } from '../Form/InputTextArea';
import { postRequest } from '../Helper/ApiHelper';
import { IsNumber, Required, composeValidators } from '../Helper/FormValidationHelper';
import { getUserLocation } from '../Helper/LocationHelper';

const addPickup = async (values) => {
    let body = new FormData();
    for (let key in values) {
        body.append(key, values[key]);
    }

    const response = await postRequest('/api/pickups', body);
    const payload = await response.json();

    return payload;
};

export const AddPickupForm = () => {
    const history = useHistory();
    const [location, setLocation] = useState();

    useEffect(() => {
        getUserLocation(position => {
            setLocation(position.coords);
        });
    }, []);

    return (
        <Form
            onSubmit={async (values) => {
                await addPickup(values);
                history.push('/add-pickup/done');
            }}
            initialValues={{
                longitude: location?.longitude,
                latitude: location?.latitude
            }}
            render={({ handleSubmit, submitting, form }) => (
                <form onSubmit={handleSubmit}>
                    <div className="input__container">
                        <Field
                            name="longitude"
                            type="hidden"
                            component={InputText}
                            disabled={submitting}
                            validate={composeValidators(Required, IsNumber)}
                        />
                    </div>
                    <div className="input__container">
                        <Field
                            name="latitude"
                            type="hidden"
                            component={InputText}
                            disabled={submitting}
                            validate={composeValidators(Required, IsNumber)}
                        />
                    </div>
                    <div className="input__container">
                        <label>Type</label>
                        <Field
                            name="type"
                            component={InputSelect}
                            disabled={submitting}
                            validate={Required}
                            items={[
                                { value: 'plastic', name: 'Plastic' },
                                { value: 'constructionMaterial', name: 'Construction Material' },
                                { value: 'other', name: 'Other' },
                            ]}
                        />
                    </div>
                    <div className="input__container">
                        <label>Amount (Kg)</label>
                        <Field
                            name="amount"
                            type="text"
                            component={InputText}
                            disabled={submitting}
                            validate={composeValidators(Required, IsNumber)}
                        />
                    </div>
                    <div className="input__container">
                        <label>Notes</label>
                        <Field
                            name="notes"
                            type="text"
                            component={InputTextArea}
                            disabled={submitting}
                        />
                    </div>
                    <div className="input__container">
                        <label>Image</label>
                        <Field
                            name="image"
                            component={InputFile}
                            type="file"
                            selector="imageLabel"
                            disabled={submitting}
                        />
                    </div>
                    <div className="input__container input__container--action">
                        <button type="submit" className="button--primary" disabled={submitting}>Add Pickup Location</button>
                    </div>
                </form>
            )}
        />
    );
};