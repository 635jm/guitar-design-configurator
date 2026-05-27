# Production QA Checklist

Production URL: https://guitar-design-configurator-pz9saibi8-635-jl-s-projects.vercel.app

Use this checklist after each production deployment of the Guitar Design Configurator.

## 1. Homepage Load

- [ ] Open the production URL in a normal browser window.
- [ ] Confirm the dashboard page loads without a server or browser error.
- [ ] Confirm the page title, dashboard hero content, and Add Project action are visible.
- [ ] Confirm the localStorage notice is visible.
- [ ] Confirm the empty state appears when no projects are saved.

## 2. New Project Flow

- [ ] Click Add Project.
- [ ] Confirm the new project page opens.
- [ ] Try submitting without a project name and confirm validation prevents creation.
- [ ] Enter a project name, guitar type, and optional notes.
- [ ] Select each starter preset at least once across QA runs.
- [ ] Create a project from a preset and confirm it opens the configurator.

## 3. Dashboard Project List

- [ ] Return to the dashboard after creating a project.
- [ ] Confirm the project appears with name, guitar type, notes, body, finish, pickups, and bridge details.
- [ ] Confirm Configure and Summary links open the correct project.
- [ ] Confirm search filters projects by visible project details.
- [ ] Confirm sort options reorder saved projects as expected.
- [ ] Confirm Export All JSON downloads a JSON file.

## 4. Configure Page Selections

- [ ] Open a saved project's Configure page.
- [ ] Change project name, guitar type, and notes.
- [ ] Change body, neck, electronics, hardware, finish, and pickguard options.
- [ ] Confirm option selections visibly update their selected state.
- [ ] Confirm the guitar preview updates when visual options change.
- [ ] Confirm preset buttons update the draft configuration before saving.

## 5. Save Behavior

- [ ] Make several configuration changes.
- [ ] Click Save.
- [ ] Confirm clear saved feedback appears.
- [ ] Refresh the browser.
- [ ] Confirm saved values remain after refresh.
- [ ] Confirm unsaved preset or option changes are not persisted until Save is clicked.

## 6. Summary Page

- [ ] Open the Summary page for a saved project.
- [ ] Confirm the full build spec is shown.
- [ ] Confirm notes appear when present.
- [ ] Confirm the generated image prompt appears.
- [ ] Test Copy Summary and confirm it copies or shows fallback feedback.
- [ ] Test Download TXT and confirm a text file downloads.
- [ ] Test Copy Prompt and confirm it copies or shows fallback feedback.
- [ ] Test Export Project JSON and confirm a JSON file downloads.

## 7. LocalStorage Persistence

- [ ] Create at least one project.
- [ ] Refresh the dashboard and confirm projects remain.
- [ ] Close and reopen the browser tab, then confirm projects remain.
- [ ] Confirm production data is isolated to the current browser/device.
- [ ] Confirm clearing site storage removes saved projects.

## 8. Duplicate And Delete Behavior

- [ ] Duplicate a saved project from the dashboard.
- [ ] Confirm the duplicate appears as a separate project.
- [ ] Configure the duplicate and confirm the original project is unchanged.
- [ ] Delete a project and confirm the browser confirmation appears.
- [ ] Cancel delete and confirm the project remains.
- [ ] Confirm delete and verify the project is removed.

## 9. Mobile Responsive Check

- [ ] Open the production URL in a mobile viewport or on a phone.
- [ ] Confirm dashboard content is readable without horizontal scrolling.
- [ ] Confirm project cards, forms, selectors, and buttons fit on screen.
- [ ] Confirm the configure page preview and controls remain usable.
- [ ] Confirm summary export actions remain reachable and readable.

## 10. Known Limitations And Next Improvements

- [ ] Note that all project data is browser-local only.
- [ ] Note that there is no backend sync, authentication, database, payment flow, real AI image API, or 3D rendering.
- [ ] Consider adding import JSON support.
- [ ] Consider adding richer preview/export image support.
- [ ] Consider adding side-by-side project comparison.
- [ ] Consider adding optional account sync in a future version.
- [ ] Consider expanding guitar option depth for pickups, bridge, scale length, and tuning.
