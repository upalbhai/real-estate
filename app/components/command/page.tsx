"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Check,
  Code2,
  Sliders,
  Sparkles,
  Keyboard,
} from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandTrigger,
  CommandMenu,
  CommandGroupDefinition,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  commandShowcaseGroups,
  commandPropsDocs,
  commandUsageSnippets,
} from "@/data";

export default function CommandShowcasePage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeSnippetId, setActiveSnippetId] = React.useState(
    commandUsageSnippets[0].id
  );
  const [copied, setCopied] = React.useState(false);
  const [lastExecuted, setLastExecuted] = React.useState<string | null>(null);

  const activeSnippet =
    commandUsageSnippets.find((s) => s.id === activeSnippetId) ??
    commandUsageSnippets[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Enhance showcase groups with interactive router navigation & feedback
  const interactiveGroups: CommandGroupDefinition[] = React.useMemo(() => {
    return commandShowcaseGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        onSelect: () => {
          setLastExecuted(`${group.heading} → ${item.label}`);
          if (item.href) {
            router.push(item.href);
          }
        },
      })),
    }));
  }, [router]);

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="gold">UI Command Component</Badge>
          <span className="text-xs text-muted-foreground font-mono">
            @/components/ui/command
          </span>
          <span className="rounded-full bg-surface-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border">
            Keyboard-First • ⌘K
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Command Palette &amp; Spotlight Search
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl font-body leading-relaxed">
          Fast, accessible, Raycast-inspired spotlight dialog with keyboard navigation, fuzzy property search, operational quick actions, and deep system wayfinding.
        </p>
      </div>

      {/* 1. Interactive Live Sandbox */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Sliders className="h-5 w-5 text-brand-gold" />
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Interactive Command Sandbox
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Press <kbd className="font-mono bg-surface-secondary px-1.5 py-0.2 rounded border border-border text-foreground font-bold">⌘K</kbd> anywhere on this page, or click the trigger button below.
              </p>
            </div>
          </div>
          <Badge variant="outline" size="sm">
            Live Preview
          </Badge>
        </div>

        {/* Action Trigger Banner */}
        <div className="rounded-card border border-border bg-surface-secondary/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-semibold text-foreground">
              Test Global Spotlight Palette
            </h3>
            <p className="text-xs text-muted-foreground">
              Search luxury properties, navigation routes, legal NDA actions, and UI primitives with real-time keyboard navigation.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <CommandTrigger
              onClick={() => setModalOpen(true)}
              label="Search estates, pages, commands..."
              shortcut="⌘K"
              className="w-full md:w-80"
            />
            <Button
              variant="gold"
              size="sm"
              onClick={() => setModalOpen(true)}
              className="shrink-0"
            >
              Open Menu
            </Button>
          </div>
        </div>

        {/* Execution Feedback Notification */}
        {lastExecuted && (
          <div className="p-3.5 rounded-control border border-brand-gold/40 bg-brand-gold/10 text-xs text-foreground flex items-center justify-between animate-fadeIn">
            <span>
              Executed Command: <strong className="text-brand-gold font-mono">{lastExecuted}</strong>
            </span>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setLastExecuted(null)}
            >
              Dismiss
            </Button>
          </div>
        )}

        {/* Inline Embedded Command Preview */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Inline Embedded Variant (Without Modal Dialog)
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Interactive Live Box
            </span>
          </div>

          <div className="rounded-card border border-border bg-surface p-2 shadow-md max-w-2xl mx-auto">
            <Command className="border-0 shadow-none">
              <CommandInput placeholder="Filter estates or commands in real time..." />
              <CommandList className="max-h-64">
                <CommandEmpty>No matching results found.</CommandEmpty>
                {interactiveGroups.slice(0, 2).map((group, idx) => (
                  <React.Fragment key={group.heading}>
                    <CommandGroup heading={group.heading}>
                      {group.items.map((item) => (
                        <CommandItem
                          key={item.id}
                          id={`inline-${item.id}`}
                          value={item.label}
                          keywords={item.keywords}
                          badge={item.badge}
                          icon={item.icon}
                          onSelect={item.onSelect}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-foreground truncate">
                              {item.label}
                            </span>
                            {item.shortcut && (
                              <CommandShortcut>{item.shortcut}</CommandShortcut>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    {idx === 0 && <div className="h-[1px] bg-border/60 my-1.5 mx-1" />}
                  </React.Fragment>
                ))}
              </CommandList>
            </Command>
          </div>
        </div>
      </section>

      {/* 2. Keyboard Ergonomics Matrix */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Keyboard Navigation Protocol
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Engineered for power users, brokers, and administrators who navigate rapidly without reaching for a pointer device.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              keys: "⌘K / Ctrl+K",
              label: "Global Trigger",
              description: "Toggles command palette anywhere across admin & website pages.",
            },
            {
              keys: "↑ / ↓ Arrows",
              label: "Cycle Selection",
              description: "Cycles through visible items with automatic index wrap-around.",
            },
            {
              keys: "↵ Enter",
              label: "Execute Item",
              description: "Triggers onSelect callback or navigates to target asset dossier.",
            },
            {
              keys: "ESC Escape",
              label: "Dismiss Dialog",
              description: "Closes modal and returns focus to the previously active element.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-control border border-border bg-surface-secondary/30 p-4 space-y-2 hover:border-brand-gold/40 transition-colors"
            >
              <kbd className="font-mono text-xs text-brand-gold font-bold px-2 py-1 rounded bg-surface border border-border inline-block shadow-2xs">
                {item.keys}
              </kbd>
              <h3 className="text-xs font-semibold text-foreground pt-1">
                {item.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Component API & Props Documentation */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-brand-gold" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Component Properties &amp; API
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            TypeScript definitions for &lt;Command&gt;, &lt;CommandDialog&gt;, &lt;CommandInput&gt;, and &lt;CommandMenu&gt;.
          </p>
        </div>

        <div className="overflow-x-auto border border-border rounded-control">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-secondary/70 border-b border-border text-foreground font-semibold">
              <tr>
                <th className="py-2.5 px-4 font-mono">Component</th>
                <th className="py-2.5 px-4 font-mono">Prop</th>
                <th className="py-2.5 px-4 font-mono">Type</th>
                <th className="py-2.5 px-4 font-mono">Default</th>
                <th className="py-2.5 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {commandPropsDocs.map((doc) => (
                <tr
                  key={`${doc.component}-${doc.prop}`}
                  className="hover:bg-surface-secondary/40 transition-colors"
                >
                  <td className="py-2.5 px-4 font-mono text-foreground font-semibold">
                    &lt;{doc.component}&gt;
                  </td>
                  <td className="py-2.5 px-4 font-mono text-brand-gold font-semibold">
                    {doc.prop}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-muted-foreground">
                    {doc.type}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs text-foreground">
                    {doc.default}
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground">
                    {doc.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Copyable Implementation Snippets */}
      <section className="card-base p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Implementation Usage Examples
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Production-ready patterns to integrate command palettes into headers, dashboards, and modal overlays.
            </p>
          </div>
          <Badge variant="gold">Copyable Code</Badge>
        </div>

        {/* Snippet Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          {commandUsageSnippets.map((snippet) => (
            <Button
              key={snippet.id}
              type="button"
              size="sm"
              variant={activeSnippetId === snippet.id ? "primary" : "ghost"}
              onClick={() => setActiveSnippetId(snippet.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-control text-xs font-mono font-medium h-auto",
                activeSnippetId === snippet.id
                  ? "shadow-xs font-bold"
                  : "bg-surface-secondary/40 text-muted-foreground hover:bg-surface-secondary hover:text-foreground"
              )}
            >
              {snippet.title}
            </Button>
          ))}
        </div>

        {/* Active Snippet Code Block */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{activeSnippet.description}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleCopyCode(activeSnippet.code)}
              leftIcon={
                copied ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )
              }
              className="gap-1.5 text-xs font-medium"
            >
              {copied ? "Copied to Clipboard" : "Copy Snippet"}
            </Button>
          </div>

          <div className="relative">
            <pre className="p-4 sm:p-5 rounded-control bg-surface-secondary/70 border border-border text-xs font-mono text-foreground overflow-x-auto leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* The Global Spotlight Dialog Instance */}
      <CommandMenu
        open={modalOpen}
        onOpenChange={setModalOpen}
        groups={interactiveGroups}
        placeholder="Type a command or search estates (e.g. Bel Air, Tribeca, NDA)..."
        emptyText="No matching commands or properties found."
      />
    </div>
  );
}
