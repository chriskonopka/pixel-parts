# Pixel Parts — Component Registry

All components import from `@mwe-apps/pixel-parts`.

```ts
import { Button, Modal, Toast } from '@mwe-apps/pixel-parts';
```

---

## Buttons & Actions

**Button** — Styled button with icon and variant support.
`icon, rightIcon, text, onClick, variant('white'|'lightGray'|'green'|'dark'|'darkMuted'|'transparent'|'alert'|'alertOutline'|'link'|'navy'|'tabNavy'), fullWidth, isActive, isLarge, textColor, disabled`

**ButtonGroup** — Toggle group with animated active-indicator.
`options(string[]|{value,label}[]), onChange, defaultSelected, variant('light'|'dark'), isFullWidth, isDisabled`

**CopyButton** — Copies content to clipboard with toast confirmation.
`content, text, fontSize, confirmation({type('basic'|'toast'), message, duration, position})`

**Favorite** — Star toggle with favorited/unfavorited state.
`isFavorited, favorited({iconName,iconColor,text}), unFavorited({iconName,iconColor,text}), onClick`

---

## Overlays & Notifications

**Modal** — Centered portal dialog.
`title, footer, children, autoHeight, centerContent, isAlert, minWidth, showCloseButton, onClose, zIndex`

**Drawer** — Slide-out panel from any edge.
`isOpen, children, position('left'|'right'|'top'|'bottom'), paneWidth, panelHeight, hasOverlay, isFixedPosition, topOffset`

**DrawerPanel** — Header+content wrapper for Drawer.
`children, title, description, onClose, hasShadow, hasOverflow`

**useDrawer** *(hook)* — Manages drawer state with outside-click detection.
Returns: `{ isOpen, activeDrawer, openDrawer, closeDrawer, toggleDrawer, setActiveDrawer }`

**Popup** — Popover anchored to a trigger element.
`title, icon, children, triggerElement, isRelativeToTrigger, inset, width`
Ref: `{ setShowPopup, togglePopup }`

**Toast** — Top-of-viewport notification with icon.
`message, isVisible, icon, iconColor, duration({length,onStart?,onEnd?}), position('top-left'|'top-center'|'top-right'), topOffset`

**Accordion** — Collapsible panel list (one open at a time).
`children, variant('gray'|'navy'), defaultOpenIndex`

**AccordionPanel** — Single accordion item.
`children, title, subtitle, isOpen, showTrigger, variant('gray'|'navy')`

---

## Form Inputs

**Checkbox** — Labeled checkbox.
`label, checked, onChange, disabled, id`

**Switch** — Accessible toggle (Space/Enter/Arrow keys).
`checked, defaultChecked, onChange, disabled, size('sm'|'md'|'lg'), label, id`

**SliderSwitch** — Visual slider toggle with optional icon.
`checked, onChange, text, buttonIconSrc, accessibilityLabel, disabled`

**Dropdown** — Single or multi-select dropdown.
`variant('dark-multi'|'light'), dropdownOptions, selectedKey, initialSelectedKeys, multiSelect, displayText, placeholder, label, onChange, width, readOnly`

**SearchBox** — Textarea with file/image attachment support.
`value, onChange, onSearch, onClear, placeholder, ariaLabel, hasFileAttachment, hasImageAttachment, allowMultipleFiles, documentFormats, onFileSelect, onFileRemove, isMultiline, styleType('dark'|'main'), isLoading, onCancel, disabled, actionButtons`
Ref: `{ attachFiles, focusInput }`

**FileUpload** — File picker button with validation.
`accept, multiple, onFileSelect, buttonText, icon, variant('default'|'button'), isLarge, disabled`

**SingleLineText** — Text with "Show more/less" truncation toggle.
`text`

---

## File & Media

**FileIcon** — Icon by file extension (PDF, Word, Excel, etc).
`fileName, className, size`

**DocumentIcon** — Styled document icon with optional image.
`color, size, src`

**Attachment** — File/image preview chip with remove button.
`attachment({fileName,type,previewUrl}), isLoading, onRemove`

**Image** — Image with lazy-load fallback and shape options.
`src, alt, width, height, isRound, isBeveled, onLoadFallback`

**Video** — Video player with preview thumbnail.
`videoUrl, previewThumbnail, width, height, preload('none'|'metadata'|'auto')`

**PDFViewer** — PDF viewer with text/area highlight support.
`documentUrl, highlightCoordinates, onScrollChange, hideTooltip, highlightParamKey`

---

## Typography

**Heading** — Semantic heading with size, weight, color, and border.
`children, as('h1'–'h6'), size, weight(400|600|'normal'), isDark, align('left'|'center'|'right'), hasBottomBorder, marginTop, marginBottom`

**TextElement** — Generic text wrapper with full style props.
`children, as(any HTML element), display, size, color, weight, lineHeight, alignment, margin, padding`

**Pill** — Color badge with optional icon and click/link.
`color('blue'|'green'|'purple'|'orange'), text, darkMode, clickable, isLarge, endIcon, link`

**DefinitionList** — Term-definition pairs (`<dl>`).
`data({ [term: string]: string })`

---

## Layout

**FlexBox** — Flex container.
`children, display('flex'|'inline-flex'), spacing, direction, justifyContent, alignItems, wrap, margin`

**FlexBoxItem** — Flex child.
`children, flexGrow, flexShrink, flexBasis, alignSelf, order`

**Grid** — CSS Grid container.
`children, gridColumnGap, gridRowGap`

**GridItem** — Grid cell with responsive column widths.
`children, columns({sm,md,lg,xl})`

**PageBanner** — Header bar with breadcrumbs and left/right slots.
`leftContent, rightContent, breadcrumbs, backgroundColor, disableShadow`

**PageBannerTitle** — Title/subtitle with icon for PageBanner.
`title, subtitle, titleColor, titleSize, icon`

**ShimmerPanel** — Animated loading skeleton.
`variant('white'|'gray'|'dark')`

---

## Tables

**ResponsiveTable** — Sortable, filterable, paginated data table.
`columns(Column[]), data, isSortable, isFilterable, isStriped, pageSize, tableLayout('auto'|'fixed'), defaultSortColumn, selectable, selectionMode('single'|'multiple'), onSelectionChange`

---

## Feedback

**Feedback** — Like/dislike rating buttons.
`onClick, iconSize, buttonSpacing, isSubmitted`

**FeedbackPanel** — Card with preset feedback options + comment box.
`title, onSubmit, onShowUserCommentBox`

**FeedbackModal** — Full modal feedback form with dropdown and textarea.
`title, formTitle, formSubtitle, onClose, onSubmit, submitResponse({status,message}), inputOptions({key,text}[]), showFollowUpCheckbox`

**AccessWarning** — License-missing alert with request-access link.
`platformTitle, requestAccessUrl`

**MaiComparisonModal** — Table comparing McDermott AI vs ChatGPT vs Copilot.
`data, isOpen, loading, error, triggerText, modalTitle`

**Timer** — Elapsed time display (mm:ss) while loading.
`isLoading`

---

## Chat

**ChatDialog** — Main chat container with header, messages, and input.
`children, chatPreview, promptInputComponent, isOpen, isLoading, icon, onCloseWindow, variant('inline'|'modal'), chatWindowTitle, actionButtons, disclaimer, hasGuardrails, errorComponent`

**ChatPreview** — Empty-state with icon, title, description, and seed prompt.
`icon, title, description, seedPrompt, onSeedPromptClick, maxWidth`

**SuggestedPrompts** — Clickable prompt suggestion buttons.
`prompts({Title?,Prompt}[]), onSelect, isDisabled, isAnimated, itemLimit, characterLimit`

**ChatResponse** — Renders a single chat message with markdown/HTML support.
*(internal sub-component of ChatDialog — use via ChatDialog children)*

**ChatResponseLoader** — Animated typing indicator.
*(internal sub-component — used inside ChatDialog)*

**ClearChat** — Button to reset the conversation.
*(internal sub-component — used inside ChatDialog)*

**ActionButton** — Icon button for chat toolbar actions.
*(internal sub-component — used inside ChatDialog `actionButtons` prop)*

**PromptConfigPopup / PromptConfigPopupProvider** — Popup for configuring prompt settings.
`(wrap app in PromptConfigPopupProvider; render PromptConfigPopup where needed)`

**CitationSettings / DownloadDocuments / MyProfileSettings** — Settings panels for chat header.
*(slot into ChatDialog `actionButtons`)*
