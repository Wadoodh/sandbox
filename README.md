# multi-step-form-and-validation

An exmaple showing a multi-step form with validation using one Webflow form element.

- Example Webflow site: https://multi-step-form-and-validation.webflow.io/

# How it works

Only one Webflow form is used. Every form step is organized into a single div block called `step`.

<img src="https://media.cleanshot.cloud/media/46844/mTNSyx5HcB39e8qNjWvdfJ5SaN5nbTWCE2sNaCwr.jpeg?Expires=1664318540&Signature=RI~lIiJYD0BhasQYzEPBXXlnWNpbcK4qbYBLsXWAZTNHTRcfsg2fsjVDyI~~X2Rz70EYakBf8Bm~mS8fxFfxCfziWgVMSIN5ss2bp-j7n~pLiTHFX3q15TZCjXQm7ruTC83oy4dkkbWG6RVqQ6J7c6QK6fOYWDLlnkb1lES5y-K5DRG~d2zGDTFGgjkc3Ies6BvCULomfDS8xiMh32C0v8TDvuLOlHedDf8D-RWzeRZu2zm3M4VksC96ou1ftxqamnND6VbgXYxQB8GDxS3HA1cc69HR7Po1W6PQCoUpgdYlcTdFNwNZWbz1~hbHQnIAWnwOuBFeoSIjOsGG25lcgQ__&Key-Pair-Id=K269JMAT9ZF4GZ" alt="form steps in the navigator panel" width="300"/>

The total number of steps depends on how many `step` elements there are. This exmaple has 4 steps.

Each step contains a grouping of the

- input label
- input(s)
- error message

<img src="https://media.cleanshot.cloud/media/46844/t6RR7FypwNZZcuEQnR2r9M4Puxm7seAUjPB7P7Vh.jpeg?Expires=1664318638&Signature=qe-qnlWK0IvV8~hTtYLypiL7SNdujWsbeSoReYlqeOETxdm2krOKERSl3Rd3xdbCu91SeiqGCi-0K4QFWZ4zvKYPs2tzUoAUvPsENBUdPZgvAbZ8aiwKm9xZfy9uBzf6EyjzdtTnoiP68xGrtbxyEatjknOZeopXxRtcNLiKzu2YEz9qQOICT1Vs3EncQzNnkmyNWkLmsTw2oQimbI8fsUj7NkHr-my1jSjEqhq6mWO4LP8LfOFIYZak92VFqdkrcK07kqQjUEKk7mHVWOTtxjbeJ~88UtRqYwReV0fb4E-U9NBuUSdtg1~Wl4I2sVLP1FgGn8AcJhcYsnfV2qkAFA__&Key-Pair-Id=K269JMAT9ZF4GZ" alt="input group in each form step" width="300">

This structure allows us to show an error/success for each input we're validating by passing the input to the `setError` or `setSuccess` functions.

When validation fails, the `input-error` class is added to the input to give it a red color and an 'x' icon, indicating an error.

When validation passes, the `input-success` class is added to the input giving it a green color and checkmark, indicating it has passed.

<img src="https://media.cleanshot.cloud/media/46844/atN6ietlFwK2SLATJBZPBvjJeU30q7307K347XA0.jpeg?Expires=1664319923&Signature=YGjNCW3rvbFZ06koZ-ef8xtw30JXwlvp5dZFHp0FjXmZF3h9dNVgdA0JAyEfBLqfBY4TKg4HlYvTzbanuVBNqIL1X1exsmK8LolS46D3eMYwYyJa4w1nOFpvFCm5GbkGpsA4-VVibN4-TM9BBKTHZkxCdRVBPgxQO9zTYcZMAWTKPP~0eBOj1Wafpdse9~GJZ03kmuMMOKVWtAKEZE4dVNzOb1VKCvMmhL7PPr6opb0owriCUroyP4tejUksVefgoImTmveBOtv9RgOoLxyPKP3c~X2GkiAJHzzD5AXRF7~OdaCgC33YnjZrWAy-8MqMUWXdMJE2J-Ye5a4rmGpWKQ__&Key-Pair-Id=K269JMAT9ZF4GZ" alt="input group in each form step" width="400">

By default, all form steps are set to display none except for the first step. The `active` class is added to the relevant step to show it. The step can only be changed forwards if validation in the current step passes. Going back doesn't require or involve validation. The `active` class is added to the first step in Webflow to show it when the page loads.

The current step is shown with the steps overview element.

<img src="https://media.cleanshot.cloud/media/46844/aMEVRukSE0nqrbN1MoVCD2fpGRFDAlOqislXBPK5.jpeg?Expires=1664318833&Signature=XdJ2QVishYN0-rLf7H1744l~tD6xiTgP84uBCP8AS6h03n1KHN82Ngs7WUwH7MgpPoiS2e7-dendS-lc0IYNnnMryrWSoDrYLQrIrWEfovvsh7~Q-gw5aVXKl~E2i6LCpsrk8rvBeRUGPCYhAqNZFYHRtOGuyDJke00Qw-uBCIaBS5IefOlmyWfAcf2kHFElUgCy2RTbDo-zmGP-j2LWCKW~9hPeZ57E3hKiYgsFQ0cTuMniidrYgKhZHxNb28OvR2KNHDZqZTlHYH1YU6eyyfUm4jfg3GseON1uXRVoJd-uZDvSnuUwTL7bmZ1~ISZU7g6pePfoZo3ua73~~t10~g__&Key-Pair-Id=K269JMAT9ZF4GZ" alt="input group in each form step" width="500">

The `Webflow.push` function handles validation for the last step because it submits the form. See [the form validation repo](https://github.com/Webflow-Examples/form-validation) to learn about validating a form before submission.

# The Javascript

The code begins by getting neccessary elements like the form, the total steps in the form, and the form overview steps.

Next we set the currentstep to 0 which indicates the first step.

Next get all of the inputs for each step.

Since we're using radio buttons and checkboxes, we set up event listeners to determine when each is checked. Those functions are instantiated.

Next we set up a click listener on the form element. In this function, we return if a `previous` or `next` button is not clicked. Meaning we don't perform any validation or step change logic unless the user clicks on previous or next.

Based on which button is clicked — previous or next — we perform the relevant logic for validation and change the form step if validation passes.

Next is a series of function definitions for showing the current step, going to the next step, handling the step overview element, setting an input error, and an input success.

Next is a series of functions to handle the validation for each form step — which we call in the click listener on the form element.

Next we have the `Webflow.push` function to handle validation on the last step when the user hits submit.

Next are function definitions for the radio and checkbox event listeners.

Next are blur event listeners on the name, email, and phone inputs to also validate when the user moves off the input.

Next are input event listeners to validate as the user is typing, only when there is an input error.

Finally we have the individual function definitions for validating the name, email, and phone number inputs. This is where you would include your unique logic for each input. These functions are used in each of the relevant validation steps. They return false when validation fails which prevents the form from progressing to the next step.
