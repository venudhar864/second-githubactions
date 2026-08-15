import { useState } from 'react';
import { TAGS, validate } from '../lib/sessions.js';

const EMPTY = { label: '', minutes: '45', tag: TAGS[0] };

export default function SessionForm({ onAdd }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    onAdd({ ...values, label: values.label.trim() });
    setValues(EMPTY);
    setErrors({});
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2 className="panel__title">Plan a session</h2>

      <div className="field">
        <label htmlFor="label">What are you working on?</label>
        <input
          id="label"
          name="label"
          value={values.label}
          placeholder="Rewrite the pricing page"
          onChange={(e) => update('label', e.target.value)}
          aria-invalid={Boolean(errors.label)}
          aria-describedby={errors.label ? 'label-error' : undefined}
        />
        {errors.label && (
          <p className="field__error" id="label-error" role="alert">
            {errors.label}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            name="minutes"
            type="number"
            min="1"
            max="480"
            value={values.minutes}
            onChange={(e) => update('minutes', e.target.value)}
            aria-invalid={Boolean(errors.minutes)}
            aria-describedby={errors.minutes ? 'minutes-error' : undefined}
          />
          {errors.minutes && (
            <p className="field__error" id="minutes-error" role="alert">
              {errors.minutes}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="tag">Kind of work</label>
          <select
            id="tag"
            name="tag"
            value={values.tag}
            onChange={(e) => update('tag', e.target.value)}
          >
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="button button--primary">
        Add session
      </button>
    </form>
  );
}
