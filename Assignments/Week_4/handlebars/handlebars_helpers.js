module.exports = ((HB) => {
  // HB.registerPartial('css-imports', '<h1>lolwut</h1>');

  let cachedTemplates= {};

  /* const process = (context = {}, options = {}) => {
    const templateFn = options.fn;
    const templateContext = context;
    const parentTemplateName = options.hash.templateName || 'default';
    const parentTemplateObj =
      cachedPartials[parentTemplateName] || cachedPartials.default;
    const parentTemplateContext = {
      title: 'Test Page',
      content: templateFn(templateContext).toString(),
    };
    try {
      return parentTemplateObj.fn(parentTemplateContext);
    } catch (e) {
      return e;
    }
  }; */

  HB.registerHelper('greeting', ({ hash: { name, mood } }) => HB.compile('<h1>Hi my name is {{name}} and im feeling {{mood}}.</h1>')({ name, mood }));

  HB.registerHelper('toUpper', value => {
    return value.toUpperCase();
  });

  HB.registerHelper('examinePartial', (context, partial) => {
    console.log(context);
    console.log(partial.fn(this).toString());
    return partial.fn(this);
  });

  HB.registerHelper('toSafeString', (string, options = {}) => {
    return new HB.SafeString(string);
  });

  HB.registerHelper('cacheTemplate', (context = {}, options = {}) => {
    const templateName = options.hash.name;
    const templateFn = options.fn;
    cachedTemplates = {
      ...cachedTemplates,
      [templateName]: {
        name: templateName,
        fn: templateFn,
        cachedContext: context,
        cachedOptions: options,
      },
    };
    // console.log(util.inspect(options, false, null, true));
    // console.log(options.data.exphbs.partials['blank-template'].toString());
    // console.log(options.fn(this).toString());
    // console.log('HOORAY!');
  });

  HB.registerHelper('applyTemplate', (options = {}) => {
    const injectFn = options.fn;
    const injectContext = options.hash.context || options.data.root || this;
    const cachedTemplateName = options.hash.templateName || 'default';
    const cachedTemplateObj = cachedTemplates[cachedTemplateName] || cachedTemplates.default;
    const cachedTemplateContext = {
      title: options.hash.title,
      content: injectFn(injectContext).toString(),
    };
    try {
      return cachedTemplateObj.fn(cachedTemplateContext);
    } catch (e) {
      return `applyTemplate haz sum erorr captain: ${e}`;
    }
  });

  HB.registerHelper('generateTemplate', (context = {}, options = {}) => {
    const templateName = options.hash.name || 'default';
    const templateFn = options.fn;
    const templateContext = context;

    HB.registerHelper(templateName, (opt = {}) => {
      try {
        console.log('lol');
        return templateFn({ title:'test', content: opt.fn(templateContext).toString() });
      } catch (e) {
        return e;
      }
    });

    /* return HB.registerHelper('blank', (options) => {
      console.log('HI IM BLANK');
      console.log(HB.helpers);
    }); */
  });
});
