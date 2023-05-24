<script lang="ts">
</script>

<button type="button" class="btn">
	<div class="icon avatar">
		<div class="rounded w-6">
			<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
				><rect
					x="48"
					y="80"
					width="416"
					height="352"
					rx="48"
					ry="48"
					fill="none"
					stroke="currentColor"
					stroke-linejoin="round"
					stroke-width="32"
				/><circle
					cx="336"
					cy="176"
					r="32"
					fill="none"
					stroke="currentColor"
					stroke-miterlimit="10"
					stroke-width="32"
				/><path
					d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="32"
				/></svg
			>
		</div>
	</div>
	<p class="flex-grow">Image_1</p>
</button>

<style lang="postcss">
	.btn {
		@apply flex gap-2 text-left normal-case;
	}
	.btn .icon {
		@apply grid place-items-center;
	}
	.btn p {
		@apply h-fit text-ellipsis overflow-hidden;
	}
</style>
