const searchForm = document.querySelector(".search_bar");
const searchInput = document.querySelector(".search_input");
const searchMessage = document.querySelector(".search_message");
const itemSections = Array.from(document.querySelectorAll("main section"))
      .map((section) => ({
            heading: section.querySelector(".category_heading"),
            items: Array.from(section.querySelectorAll(".category_items a")),
      }))
      .filter((section) => section.items.length > 0);

function filterItems() {
      const query = searchInput.value.trim().toLocaleLowerCase();
      let visibleCount = 0;

      itemSections.forEach(({ heading, items }) => {
            let sectionVisibleCount = 0;
            const sectionName = heading?.textContent.trim().toLocaleLowerCase() ?? "";

            items.forEach((item) => {
                  const image = item.querySelector("img");
                  const searchableText = [
                        item.getAttribute("aria-label"),
                        image?.getAttribute("alt"),
                        image?.getAttribute("src"),
                        sectionName,
                  ]
                        .filter(Boolean)
                        .join(" ")
                        .toLocaleLowerCase();
                  const isVisible = !query || searchableText.includes(query);

                  item.hidden = !isVisible;
                  if (isVisible) {
                        sectionVisibleCount += 1;
                  }
            });

            heading
                  ?.closest("section")
                  .toggleAttribute("hidden", sectionVisibleCount === 0);
            visibleCount += sectionVisibleCount;
      });

      searchMessage.hidden = !query;
      if (query) {
            searchMessage.textContent = visibleCount
                  ? `${visibleCount} matching ${visibleCount === 1 ? "item" : "items"} found.`
                  : "No matching items. Try searching for an offer or category.";
      }
}

searchInput.addEventListener("input", filterItems);
searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      filterItems();
});
