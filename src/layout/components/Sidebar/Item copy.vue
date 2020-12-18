<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes('fa')) {
        // class="fa fa-video-camera"
        vnodes.push(<i class={[icon, 'sub-fa-icon']} />);
      }
      if (icon.includes('#e-icon-')) {
        // vnodes.push(<svg-icon icon-class={icon} />);
        vnodes.push(<svg-icon icon-class={icon} class-name="custom-class" />);
      }
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />);
      }
    }

    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }
    return vnodes;
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.sub-fa-icon {
  font-size: 20px;
  margin-right: 12px;
  margin-left: -2px;
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
