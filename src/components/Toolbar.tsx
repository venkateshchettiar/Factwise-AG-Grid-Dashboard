
interface Props {
    onSearch: (value: string) => void;
    onExport: () => void;
}

export default function Toolbar({ onSearch, onExport }: Props) {

    return (
        <div className="toolbar">

            <input
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
            />

            <button onClick={onExport}>
                Export CSV
            </button>

        </div>
    );
}