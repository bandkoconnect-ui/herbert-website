module.exports = {
  slug: 'contact',
  title: 'Contact | Herbert Heitmann',
  desc: "I'm Herbert Heitmann, and this is a good overview of my career in design. From classic Graphic Design to Fullstack Design Leadership, plus a master thesis in Design Theory, it's a lifelong journey.",
  body: () => `
<section class="contact">
  <h1>Get in Touch</h1>
  <form class="contact-form" novalidate>
    <label for="first-name">First name <span aria-hidden="true">*</span></label>
    <input id="first-name" name="first_name" type="text" autocomplete="given-name" required>
    <label for="last-name">Last name <span aria-hidden="true">*</span></label>
    <input id="last-name" name="last_name" type="text" autocomplete="family-name" required>
    <label for="email">Email <span aria-hidden="true">*</span></label>
    <input id="email" name="email" type="email" autocomplete="email" required>
    <button type="submit">Submit</button>
    <p class="contact-form__msg" role="status" aria-live="polite"></p>
  </form>
</section>`,
};
