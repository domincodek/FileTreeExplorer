import { useId, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTree } from "@/app/tree/tree-context";
import { sampleTreeJson } from "@/features/tree-import/sampleTree";

export function HomePage() {
  const { tree, source, replaceTree, clearTree } = useTree();
  const navigate = useNavigate();
  const [raw, setRaw] = useState(source ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const textAreaId = useId();
  const fileInputId = useId();

  function openRaw(nextRaw: string) {
    if (nextRaw.trim() === "") {
      setError("Wklej JSON albo wgraj plik.");
      return;
    }
    const result = replaceTree(nextRaw);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    navigate("/tree");
  }

  async function loadFile(file: File) {
    try {
      const text = await file.text();
      setRaw(text);
      openRaw(text);
    } catch {
      setError("Nie udało się odczytać pliku.");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openRaw(raw);
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    event.target.value = "";
    if (file) void loadFile(file);
  }

  function onDragOver(event: DragEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(event: DragEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setIsDragging(false);
  }

  function onDrop(event: DragEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files.item(0);
    if (file) void loadFile(file);
  }

  return (
    <section className="import-page">
      <div className={isDragging ? "import-card is-dragging" : "import-card"}>
        <p className="eyebrow">Narzędzie wewnętrzne</p>
        <h1>FileTree Explorer</h1>
        <p className="lead">
          Wklej albo wgraj JSON ze strukturą katalogów. Drzewo zostaje w tej
          przeglądarce, a wyszukiwanie przeżywa odświeżenie strony.
        </p>
        {tree ? (
          <p className="resume">
            Zapisane drzewo: <strong>{tree.name}</strong>.{" "}
            <Link to="/tree">Wznów eksplorację</Link>
          </p>
        ) : null}
        <form
          onSubmit={onSubmit}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <label htmlFor={textAreaId}>Struktura JSON</label>
          <textarea
            id={textAreaId}
            value={raw}
            spellCheck={false}
            placeholder='{ "name": "root", "type": "folder", "children": [] }'
            onChange={(event) => {
              setRaw(event.target.value);
              setError(null);
            }}
          />
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : (
            <p className="drop-hint">Możesz też upuścić plik JSON na to pole.</p>
          )}
          <div className="import-actions">
            <input
              id={fileInputId}
              className="file-input"
              type="file"
              accept=".json,application/json"
              onChange={onFileChange}
            />
            <label htmlFor={fileInputId} className="button button-secondary">
              Wybierz plik
            </label>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setRaw(sampleTreeJson);
                setError(null);
                openRaw(sampleTreeJson);
              }}
            >
              Wczytaj przykład
            </button>
            <button type="submit" className="button button-primary">
              Otwórz drzewo
            </button>
          </div>
          {tree ? (
            <button
              type="button"
              className="text-button"
              onClick={() => {
                clearTree();
                setRaw("");
                setError(null);
              }}
            >
              Usuń zapisane drzewo
            </button>
          ) : null}
        </form>
      </div>
    </section>
  );
}
