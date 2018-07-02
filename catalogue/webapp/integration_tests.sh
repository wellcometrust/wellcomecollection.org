#!/usr/bin/env bash

set -o errexit
set -o nounset

RED='\033[0;31m'
NC='\033[0m' # No Color

WORKS="$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/works)"
WORKS_WITH_QUERY="$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/works\?query=botany)"
WORK="$(curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000/works/pzy7xab4)"

if [ "${WORKS}" != 200 ]
then
  echo "/works responded with ${WORKS} not 200${NC}"
  exit 1
fi

if [ "${WORKS_WITH_QUERY}" != "200" ]
then
  echo "/works?query=botany responded with ${WORKS_WITH_QUERY} not 200${NC}"
  exit 1
fi

if [ "${WORK}" != "200" ]
then
  echo "/works/pzy7xab4 responded with ${WORK} not 200${NC}"
  exit 1
fi

if [ "${WORKS}" = "200" ] && [ "${WORKS_WITH_QUERY}" = "200" ] && [ "${WORK}" = "200" ]
then
  echo "All docker integration tests have passed 🐋"
fi
