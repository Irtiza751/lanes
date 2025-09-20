import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  EditorThemeClasses,
  $createParagraphNode,
  $getRoot,
  TextFormatType,
} from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Quote,
  Code,
} from "lucide-react";

// Theme configuration following shad cn patterns
const theme: EditorThemeClasses = {
  text: {
    bold: "font-semibold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-muted px-0.5 py-0.2 rounded text-xs border border-input font-mono",
  },
  paragraph: "mb-2 last:mb-0",
  quote:
    "border-l-4 border-muted-foreground/20 pl-4 italic text-muted-foreground my-4",
  heading: {
    h1: "text-2xl font-bold mb-4",
    h2: "text-xl font-semibold mb-3",
    h3: "text-lg font-semibold mb-2",
  },
  list: {
    nested: {
      listitem: "list-none",
    },
    ol: "list-decimal list-inside mb-4 space-y-1",
    ul: "list-disc list-inside mb-4 space-y-1",
    listitem: "ml-4",
  },
  link: "text-primary underline hover:no-underline cursor-pointer",
  code: "bg-muted p-4 rounded-md font-mono text-sm block my-4 overflow-x-auto",
  codeHighlight: {
    atrule: "text-purple-600",
    attr: "text-blue-600",
    boolean: "text-red-600",
    builtin: "text-purple-600",
    cdata: "text-gray-600",
    char: "text-green-600",
    class: "text-blue-600",
    "class-name": "text-blue-600",
    comment: "text-gray-500 italic",
    constant: "text-red-600",
    deleted: "text-red-600",
    doctype: "text-gray-600",
    entity: "text-orange-600",
    function: "text-purple-600",
    important: "text-red-600",
    inserted: "text-green-600",
    keyword: "text-purple-600",
    namespace: "text-blue-600",
    number: "text-red-600",
    operator: "text-gray-700",
    prolog: "text-gray-600",
    property: "text-blue-600",
    punctuation: "text-gray-700",
    regex: "text-green-600",
    selector: "text-green-600",
    string: "text-green-600",
    symbol: "text-red-600",
    tag: "text-red-600",
    url: "text-blue-600",
    variable: "text-orange-600",
  },
};

// Floating Toolbar component
function FloatingToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = React.useState(new Set());
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection) && !selection.isCollapsed()) {
      // Selection exists and is not collapsed
      const formats = new Set();
      if (selection.hasFormat("bold")) formats.add("bold");
      if (selection.hasFormat("italic")) formats.add("italic");
      if (selection.hasFormat("underline")) formats.add("underline");

      // Check for links
      const node = selection.anchor.getNode();
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        formats.add("link");
      }

      setActiveFormats(formats);
      setIsVisible(true);

      // Calculate position
      const nativeSelection = window.getSelection();
      if (nativeSelection && nativeSelection.rangeCount > 0) {
        const range = nativeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorElement = editor.getRootElement();

        if (editorElement) {
          const editorRect = editorElement.getBoundingClientRect();
          setPosition({
            top: rect.top - editorRect.top - 50, // Position above selection
            left: rect.left - editorRect.left + rect.width / 2 - 100, // Center horizontally
          });
        }
      }
    } else {
      // No selection or collapsed selection
      setIsVisible(false);
    }
  }, [editor]);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  // Hide toolbar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection) || selection.isCollapsed()) {
            setIsVisible(false);
          }
        });
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isVisible, editor]);

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    // Keep selection after formatting
    editor.focus();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
      editor.focus();
    }
  };

  const insertList = (ordered: boolean) => {
    if (ordered) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
    editor.focus();
  };

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent losing selection
        onClick();
      }}
      title={title}
      className={`p-2 rounded-md hover:bg-muted/80 transition-colors ${
        active
          ? "bg-muted text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );

  if (!isVisible) return null;

  return (
    <div
      ref={toolbarRef}
      className="absolute z-50 flex items-center gap-1 p-1 bg-popover border border-border rounded-lg shadow-lg"
      style={{
        top: Math.max(10, position.top),
        left: Math.max(10, Math.min(position.left, window.innerWidth - 220)),
      }}
    >
      <ToolbarButton
        onClick={() => formatText("bold")}
        active={activeFormats.has("bold")}
        title="Bold (Ctrl+B)"
      >
        <Bold size={14} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => formatText("italic")}
        active={activeFormats.has("italic")}
        title="Italic (Ctrl+I)"
      >
        <Italic size={14} />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => formatText("underline")}
        active={activeFormats.has("underline")}
        title="Underline (Ctrl+U)"
      >
        <Underline size={14} />
      </ToolbarButton>

      <div className="w-px h-5 bg-border mx-1" />

      <ToolbarButton
        onClick={insertLink}
        active={activeFormats.has("link")}
        title="Insert Link"
      >
        <Link size={14} />
      </ToolbarButton>

      <div className="w-px h-5 bg-border mx-1" />

      <ToolbarButton onClick={() => insertList(false)} title="Bullet List">
        <List size={14} />
      </ToolbarButton>

      <ToolbarButton onClick={() => insertList(true)} title="Numbered List">
        <ListOrdered size={14} />
      </ToolbarButton>
    </div>
  );
}

// Main Editor interface
interface EditorProps {
  namespace: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  minHeight?: number;
  maxHeight?: number;
  autoFocus?: boolean;
}

const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(" ");
};

export function Editor({
  namespace,
  placeholder = "Start typing...",
  className,
  value,
  onChange,
  minHeight = 120,
  maxHeight = 400,
  autoFocus = false,
}: EditorProps) {
  const config = {
    namespace,
    theme,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
    ],
    onError: (error: Error) => {
      console.error("Lexical Editor Error:", error);
    },
    editorState: value
      ? `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${value}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
      : undefined,
  };

  // Component to handle onChange
  function OnChangePlugin({
    onChange,
  }: {
    onChange?: (value: string) => void;
  }) {
    const [editor] = useLexicalComposerContext();

    React.useEffect(() => {
      if (!onChange) return;

      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const root = $getRoot();
          const textContent = root.getTextContent();
          onChange(textContent);
        });
      });
    }, [editor, onChange]);

    return null;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <LexicalComposer initialConfig={config}>
        <div className="relative">
          <FloatingToolbarPlugin />

          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={cn(
                  "outline-none",
                  "prose prose-sm max-w-none",
                  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                )}
                style={{
                  minHeight: `${minHeight}px`,
                  maxHeight: `${maxHeight}px`,
                  overflowY: "auto",
                }}
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute top-0 left-0 text-muted-foreground pointer-events-none select-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />

          <HistoryPlugin />
          {autoFocus && <AutoFocusPlugin />}
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          {onChange && <OnChangePlugin onChange={onChange} />}
        </div>
      </LexicalComposer>
    </div>
  );
}
