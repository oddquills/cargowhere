# Project Prompts Log

This document records the prompt history and user instructions for the **ParkSG** (CargoWhere) Singapore Carpark Availability application.

---

## Prompt 1: Initial Application Build
**Timestamp**: 2026-11-12T01:11:18-08:00

```markdown
build a singapore based carpark application that tracks real-time carpark lots availability. build just the front end for now, i will integrate the backend later.
```

**Actions Executed**:
- Built an interactive Singapore carpark tracking frontend using React, TypeScript, Leaflet, and Tailwind CSS.
- Implemented real-time Singapore government data integration (`data.gov.sg`) with auto-refresh mechanism.
- Created comprehensive Singapore carpark registry (Orchard, Marina Bay, CBD, Jurong, Tampines, Woodlands, Toa Payoh, Bishan, Jewel Changi, etc.).
- Built interactive Leaflet map with custom color-coded lot availability markers.
- Added parking fee estimator, 24-hour occupancy profiles, vehicle lot toggles (Cars vs Motorcycles), EV charging station tags, and Singapore rates guide.

---

## Prompt 2: Git Repository Setup & Push
**Timestamp**: 2026-11-12T01:22:44-08:00

```markdown
git push: https://<GITHUB_PERSONAL_ACCESS_TOKEN>@github.com/oddquills/cargowhere.git
```
*(Personal access token sanitized for security)*

**Actions Executed**:
- Initialized local Git repository and configured Git user credentials.
- Added all project files to Git tracking, created initial commit on branch `main`.
- Set remote origin to `https://github.com/oddquills/cargowhere.git` and successfully pushed codebase.
- Sanitized remote credentials from Git config.

---

## Prompt 3: Serverless LTA DataMall Connection
**Timestamp**: 2026-11-12T01:38:49-08:00

```markdown
1. add a serverless connection that pulls live data from LTA's datamall using the following end point: 

# Live carpark lots (HDB, LTA and URA):
https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2

# Every request needs the header:  AccountKey: <LTA_ACCOUNT_KEY>

2. store this in /api folder at project root level (not the src file) 
3. include/health.ts and /carparkavailability.ts within the same subfolder
4. do not hardcode any key, i will input them later.
```

**Actions Executed**:
- Created `/api/carparkavailability.ts` serverless handler connecting to LTA DataMall's `CarParkAvailabilityv2` endpoint with `AccountKey` header support, pagination handling, and 45-second cache.
- Created `/api/health.ts` serverless diagnostic endpoint reporting uptime and `LTA_ACCOUNT_KEY` configuration status.
- Added `LTA_ACCOUNT_KEY="YOUR_LTA_ACCOUNT_KEY"` documentation to `.env.example`.
- Created root `server.ts` Express entry point mounting both `/api` endpoints alongside Vite frontend.
- Connected client-side `carparkService` to consume `/api/carparkavailability`.

---

## Prompt 4: Applet Error Diagnosis & Fix
**Timestamp**: 2026-11-12T01:42:32-08:00

```markdown
Fix the errors in the app
[AIS_METADATA_SECTION_START]
fix_it_trigger: manual
error 0: createWebSocketModuleRunnerTransport/connect/</<@https://ais-dev-uqitu6oa2whsgc3ifmic4v-997111405553.asia-east1.run.app/@vite/client:234:30

[AIS_METADATA_SECTION_END]
```

**Actions Executed**:
- Diagnosed Vite middleware WebSocket transport error caused by missing Node `httpServer` attachment in `server.ts`.
- Updated `server.ts` to attach `httpServer` directly to Vite's `server.hmr: { server: httpServer }` and respected `DISABLE_HMR`.
- Re-tested compilation and linting, verified both frontend and `/api` endpoints returned `HTTP 200 OK`.

---

## Prompt 5: Collate Prompts
**Timestamp**: 2026-11-12T01:47:30-08:00

```markdown
Collate all of the prompts and store them as a prompts.md file
```

**Actions Executed**:
- Created `prompts.md` documenting all chronological user prompts, parameters, and actions.
