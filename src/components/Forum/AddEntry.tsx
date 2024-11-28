import { useState } from "react";
import { useAddForum } from "../../features/forum/hooks";

type AddEntryType = {
  categoryFromUrl: number;
};

export const AddEntry = ({ categoryFromUrl }: AddEntryType) => {
  const { mutate } = useAddForum();

  const [state, setState] = useState({
    jmeno: "",
    email: "",
    typ: categoryFromUrl !== 8 ? "" : "8",
    text: "",
    antispam: new Date().getMilliseconds(),
    antispamForm: "",
  });

  const [formVisible, setFormVisible] = useState(false);
  const [alert, setAlert] = useState("off");

  const showForum = () => {
    setFormVisible(true);
  };

  const myChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setState((old) => ({ ...old, [event.target.name]: event.target.value }));
  };

  const mySubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    if (state.antispam === Number(data.get("antispamForm"))) {
      mutate(state, {
        onSuccess: () => {
          setFormVisible(false);
          setAlert("ok");

          setTimeout(() => {
            setAlert("off");
          }, 5000);
        },
        onError: () => console.log("error"),
      });
    } else {
      setAlert("antispamNotOk");
      setTimeout(() => setAlert("off"), 5000);
    }
  };

  let button = <></>;
  let Alert = null;
  Alert =
    alert === "ok" ? (
      <h1>Záznam byl přidán !!!</h1>
    ) : alert === "antispamNotOk" ? (
      <h1>Záznam se nepodařilo odeslat !!!</h1>
    ) : null;
  const optionList =
    categoryFromUrl !== 8
      ? [
          <option key="1" value="">
            {" "}
            --- vyber kategorii ---
          </option>,
          <option key="2" value="0">
            Fórum
          </option>,
          <option key="3" value="1">
            Inzerce
          </option>,
          <option key="4" value="2">
            Seznamka
          </option>,
          <option key="5" value="3">
            K obsahu stránek
          </option>,
        ]
      : null;
  if (formVisible) {
    button = (
      <form
        onSubmit={mySubmitHandler}
        name="formular"
        encType="multipart/form-data"
      >
        <div id="kniha_formular" className="kniha_formular">
          <div>
            <input
              onChange={(e) => myChangeHandler(e)}
              type="text"
              name="jmeno"
              placeholder="Jméno"
              size={10}
              required
            />
            <input
              onChange={myChangeHandler}
              type="text"
              name="email"
              placeholder="E-mail"
              size={15}
            />
            <select onChange={(e) => myChangeHandler(e)} required name="typ">
              {optionList}
              <option value="8">Kaliště 993m n.m.</option>
            </select>
          </div>
          <div>
            <textarea
              onChange={(e) => myChangeHandler(e)}
              rows={5}
              cols={60}
              className="text-area"
              name="text"
              placeholder="text"
              required
            ></textarea>
          </div>
          <div>
            opiš kód :{" "}
            <input
              onChange={myChangeHandler}
              type="text"
              name="antispamForm"
              placeholder={state.antispam.toString()}
              size={5}
              required
            />
          </div>
        </div>
        <input type="submit" name="odesli" defaultValue="Vlož nový příspěvek" />
      </form>
    );
  } else {
    button = (
      <button className="button" onClick={showForum}>
        Přidej záznam
      </button>
    );
  }
  return (
    <div>
      {button}
      {Alert}
    </div>
  );
};
