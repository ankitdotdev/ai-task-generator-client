"use client";

interface Props {
  title: string;
  icon: string;
  items: {
    id: string;
    content: string;
  }[];
  isEditing: boolean;
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const SpecSection = ({
  title,
  icon,
  items,
  isEditing,
  onUpdate,
  onAdd,
  onDelete,
}: Props) => {

  return (
    
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-xs text-gray-400">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            onClick={onAdd}
            className="
              px-4 py-2
              bg-teal-500/20
              hover:bg-teal-500/30
              text-teal-400
              font-semibold
              rounded-lg
              transition-all
              flex items-center gap-2
              text-sm
            "
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Add Item</span>
          </button>
        )}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No items yet</p>
          {isEditing && (
            <p className="text-gray-600 text-xs mt-1">
              Click "Add Item" to create one
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="
                bg-gray-900/50
                border border-gray-700/30
                rounded-xl
                p-4
                hover:border-teal-500/30
                transition-all
                group
              "
            >
              {isEditing ? (
                <div className="flex gap-3">
                  <textarea
                    value={item.content}
                    onChange={(e) => onUpdate(index, e.target.value)}
                    rows={3}
                    placeholder="Enter content..."
                    className="
                      flex-1
                      bg-gray-800/50
                      border border-gray-600
                      rounded-lg
                      px-4 py-3
                      text-white
                      placeholder-gray-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-teal-500
                      focus:border-transparent
                      transition-all
                      resize-none
                    "
                  />
                  <button
                    onClick={() => onDelete(index)}
                    className="
                      self-start
                      p-2
                      bg-red-500/20
                      hover:bg-red-500/30
                      text-red-400
                      rounded-lg
                      transition-all
                      flex-shrink-0
                    "
                    title="Delete item"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-teal-500/20 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    </div>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap flex-1">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
