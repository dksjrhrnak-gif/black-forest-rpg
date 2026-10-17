# 공개 배포 검증 원본 기록

대상 기능 병합 커밋: `88f1ccd4dded1437d959a795ee5108e2d4567d09`.

- `reviewed-pr-checks.json`: 병합 직전 정확한 HEAD `d588b73`와 필수 CI 19개 성공.
- `feature-merge.json`: 실제 PR #10 병합 상태·커밋·시각.
- `feature-pages-success.json`, `feature-deployment-statuses.json`: 같은 SHA의 Pages 실행 및 deployment 성공.
- `feature-http-assets.json`: 실제 공개 HTML·149개 이미지·CSV 3개의 byte 일치. 브라우저 실행과 별도인 HTTP 검사.
- `feature-journey-success.json`: 기능 main Journey 11개 작업 전체 성공.
- `feature-handoff-first-attempt.json`: 기능 main Handoff 최초 실행의 실제 단계별 결과. Chromium/WebKit의 공개 UX·P3·FX·B안은 성공했고 Firefox 공개 전직은 이미지 콘솔 오류로 실패했다. 그 뒤 Firefox 공개 단계는 실행되지 않았다.
- `feature-firefox-first-attempt-annotations.json`: 해당 오류의 GitHub check 주석. 마지막 시나리오 이름은 오류가 발생한 정확한 요청 시점을 뜻하지 않는다.
- `feature-image-recheck.json`: 같은 공개 이미지의 새 응답 3개가 정상·원본 byte 일치. 최초 오류의 원인을 확정하는 증거는 아니다.

최종 문서 커밋에서도 제품/테스트 원문을 그대로 유지하고 main의 전체 검사와 공개 3엔진을 재실행한다. 그 최종 SHA·CI·Pages·공개 검증 완료 결과는 [PR #10](https://github.com/dksjrhrnak-gif/black-forest-rpg/pull/10)의 배포 기록에 남긴다. 첫 실패 이력을 삭제하거나 성공으로 바꾸지 않는다. GitHub 메타데이터의 success는 실제 해당 단계 실행 완료를 확인한 경우에만 사용한다.
