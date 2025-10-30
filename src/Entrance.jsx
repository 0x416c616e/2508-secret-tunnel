import { useAuth } from "./AuthContext.jsx";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  //Update `<Entrance>` to call `signup` with the user's name when the form is
  // submitted.
  const { signup } = useAuth();

  async function signupOnSubmission(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name")?.trim();
    if (!name) {
      return;
    }
    await signup(name);
  }

  return (
    //fragment of html, <Fragment></Fragment> can be shortened to <></>
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={signupOnSubmission}>
        <label>
          Name
          <input name="name" />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
}
