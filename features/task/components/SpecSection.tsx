"use client";

import { AISpecOutput } from "../types/task.types";

interface Props {
  title: string;

  items: {
    id: string;
    content: string;
  }[];

  isEditing: boolean;

  onUpdate: (
    index: number,
    value: string
  ) => void;

  onAdd: () => void;
}

export const SpecSection = ({
  title,
  items,
  isEditing,
  onUpdate,
  onAdd,
}: Props) => {

  return (
    <div className="mb-8">

      {/* Header */}
      <div className="
        flex
        justify-between
        items-center
        mb-3
      ">

        <h2 className="
          text-xl
          font-semibold
        ">
          {title}
        </h2>

        {isEditing && (
          <button
            onClick={onAdd}
            className="
              text-sm
              text-[#10a37f]
              hover:underline
            "
          >
            + Add
          </button>
        )}

      </div>

      {/* Items */}
      <div className="
        flex
        flex-col
        gap-3
      ">

        {items.map((item, index) => (

          <div
            key={item.id}
            className="
              bg-[#343541]
              p-3
              rounded-lg
            "
          >

            {isEditing ? (

              <textarea
                value={item.content}

                onChange={(e) =>
                  onUpdate(
                    index,
                    e.target.value
                  )
                }

                rows={3}

                className="
                  w-full
                  bg-[#202123]
                  border border-[#565869]
                  rounded
                  p-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#10a37f]
                "
              />

            ) : (

              <p>
                {item.content}
              </p>

            )}

          </div>

        ))}

      </div>

    </div>
  );
};
