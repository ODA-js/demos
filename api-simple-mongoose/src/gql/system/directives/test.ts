import { Directive } from '../common';
import gql from 'graphql-tag';

export default new Directive({
  schema: gql`
    directive @test(message: String!) on FIELD | QUERY
  `,
});
